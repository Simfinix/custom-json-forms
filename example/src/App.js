import React, { useState } from 'react';
import { AutoForm }from 'custom-json-forms';
import { SafeAreaView, StatusBar, View, Text, ScrollView, KeyboardAvoidingView, Platform, } from 'react-native';
import { bridge as schema } from './schema/signup';
export default function App() {
    let [json, setJson] = useState(null);
    return (React.createElement(SafeAreaView, null,
        React.createElement(StatusBar, null),
        React.createElement(KeyboardAvoidingView, { behavior: Platform.OS === 'ios' ? 'padding' : 'height' },
            React.createElement(ScrollView, { contentContainerStyle: {
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                } },
                React.createElement(AutoForm, { schema: schema, onSubmit: (model) => {
                        setJson(model);
                    } }),
                !!json && (React.createElement(View, { style: { marginTop: 8, flex: 1, backgroundColor: 'lightgrey' } },
                    React.createElement(Text, null, JSON.stringify(json, null, 2))))))));
}
