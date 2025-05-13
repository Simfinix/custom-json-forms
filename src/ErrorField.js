import { connectField } from 'uniforms';
function Error(props) {
    // const theme = useTheme();
    // const themeProps = theme.props?.MuiFormControl;
    // return !error ? null : (
    //   <FormControl
    //     error={!!error}
    //     fullWidth={fullWidth ?? themeProps?.fullWidth ?? true}
    //     margin={margin ?? themeProps?.margin ?? 'dense'}
    //     variant={variant ?? themeProps?.variant}
    //   >
    //     <FormHelperText {...filterDOMProps(props)}>
    //       {children || errorMessage}
    //     </FormHelperText>
    //   </FormControl>
    // );
    return null;
}
export default connectField(Error, {
    initialValue: false,
    kind: 'leaf',
});
