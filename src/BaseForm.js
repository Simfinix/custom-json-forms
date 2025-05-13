import clone from 'lodash/clone';
import get from 'lodash/get';
import omit from 'lodash/omit';
import setWith from 'lodash/setWith';
import { View } from 'react-native';
import React, { Component } from 'react';
import { randomIds, context as FormContext, changedKeys, } from 'uniforms';
export class BaseForm extends Component {
    static displayName = 'Form';
    static defaultProps = {
        autosave: false,
        autosaveDelay: 0,
        error: null,
        label: true,
        model: Object.create(null),
        noValidate: true,
        onSubmit() { },
    };
    constructor(props) {
        super(props);
        // @ts-expect-error: State may be bigger, but it'll be covered by the subclasses.
        this.state = {
            changed: false,
            changedMap: Object.create(null),
            resetCount: 0,
            submitted: false,
            submitting: false,
        };
        this.mounted = false;
        this.randomId = randomIds(this.props.id);
        this.onReset = this.reset = this.onReset.bind(this);
        this.onChange = this.change = this.onChange.bind(this);
        this.onSubmit = this.submit = this.onSubmit.bind(this);
        // TODO: It shouldn't be here
        const getModel = this.getModel.bind(this);
        this.getModel = (mode, model = getModel(mode)) => mode !== undefined && this.props.modelTransform
            ? this.props.modelTransform(mode, model)
            : model;
    }
    componentDidMount() {
        this.mounted = true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentDidUpdate(prevProps, prevState, snapshot) { }
    componentWillUnmount() {
        this.mounted = false;
        if (this.delayId) {
            clearTimeout(this.delayId);
        }
    }
    delayId;
    mounted;
    reset;
    change;
    submit;
    randomId;
    getContext() {
        return {
            changed: this.state.changed,
            changedMap: this.state.changedMap,
            error: this.getContextError(),
            formRef: this,
            model: this.getContextModel(),
            name: this.getContextName(),
            onChange: this.getContextOnChange(),
            onSubmit: this.getContextOnSubmit(),
            randomId: this.randomId,
            schema: this.getContextSchema(),
            state: this.getContextState(),
            submitted: this.state.submitted,
            submitting: this.state.submitting,
            validating: false,
        };
    }
    getContextName() {
        return [];
    }
    getContextError() {
        return this.props.error;
    }
    getContextModel() {
        return this.getModel('form');
    }
    getContextState() {
        return {
            disabled: !!this.props.disabled,
            label: !!this.props.label,
            placeholder: !!this.props.placeholder,
            readOnly: !!this.props.readOnly,
            showInlineError: !!this.props.showInlineError,
        };
    }
    getContextSchema() {
        return this.props.schema;
    }
    getContextOnChange() {
        // It's bound in constructor.
        // eslint-disable-next-line @typescript-eslint/unbound-method
        return this.onChange;
    }
    getContextOnSubmit() {
        // It's bound in constructor.
        // eslint-disable-next-line @typescript-eslint/unbound-method
        return this.onSubmit;
    }
    getModel(mode, model = this.props.model) {
        return model;
    }
    getNativeFormProps() {
        const props = omit(this.props, [
            'autosave',
            'autosaveDelay',
            'disabled',
            'error',
            'label',
            'model',
            'modelTransform',
            'onChange',
            'onSubmit',
            'placeholder',
            'readOnly',
            'schema',
            'showInlineError',
        ]);
        return {
            ...props,
            // It's bound in constructor.
            // eslint-disable-next-line @typescript-eslint/unbound-method
            onSubmit: this.onSubmit,
            key: `reset-${this.state.resetCount}`,
        };
    }
    onChange(key, value) {
        // Do not set `changed` before componentDidMount
        if (this.mounted) {
            const keys = changedKeys(key, value, get(this.getModel(), key));
            if (keys.length !== 0) {
                this.setState((state) => 
                // If all are already marked, we can skip the update completely.
                state.changed && keys.every((key) => !!get(state.changedMap, key))
                    ? null
                    : {
                        changed: true,
                        changedMap: keys.reduce((changedMap, key) => setWith(changedMap, key, {}, clone), clone(state.changedMap)),
                    });
            }
        }
        if (this.props.onChange) {
            this.props.onChange(key, value);
        }
        // Do not call `onSubmit` before componentDidMount
        if (this.mounted && this.props.autosave) {
            if (this.delayId) {
                this.delayId = clearTimeout(this.delayId);
            }
            // Delay autosave by `autosaveDelay` milliseconds...
            this.delayId = setTimeout(() => {
                // ...and wait for all scheduled `setState`s to commit. This is required
                // for AutoForm to validate correct model, waiting in `onChange`.
                this.setState(() => null, () => {
                    this.onSubmit();
                });
            }, this.props.autosaveDelay);
        }
    }
    __reset(state) {
        return {
            changed: false,
            changedMap: Object.create(null),
            resetCount: state.resetCount + 1,
            submitted: false,
            submitting: false,
        };
    }
    onReset() {
        // @ts-expect-error
        // It's bound in constructor.
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.setState(this.__reset);
    }
    onSubmit(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState((state) => (state.submitted ? null : { submitted: true }));
        const result = this.props.onSubmit(this.getModel('submit'));
        if (!(result instanceof Promise)) {
            return Promise.resolve();
        }
        this.setState({ submitting: true });
        return result.finally(() => {
            this.setState({ submitting: false });
        });
    }
    render() {
        return (React.createElement(FormContext.Provider, { value: this.getContext() },
            React.createElement(View, { ...this.getNativeFormProps() })));
    }
}
function ReactNativePaper(parent) {
    class _ extends parent {
        static ReactNativePaper = ReactNativePaper;
        static displayName = `ReactNativePaper${parent.displayName}`;
    }
    return _;
}
export default ReactNativePaper(BaseForm);
