import { ValidatedForm } from 'uniforms';
import BaseForm from './BaseForm';
function Validated(parent) {
    class _ extends ValidatedForm.Validated(parent) {
        static Validated = Validated;
    }
    return _;
}
export default Validated(BaseForm);
