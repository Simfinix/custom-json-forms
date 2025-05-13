import { connectField } from 'uniforms';
function ListItem(props) {
    // return (
    //   <ListItemMaterial
    //     dense={dense}
    //     disableGutters={disableGutters}
    //     divider={divider}
    //   >
    //     {children}
    //     <ListDelField name="" icon={removeIcon} />
    //   </ListItemMaterial>
    // );
    return null;
}
export default connectField(ListItem, {
    initialValue: false,
});
