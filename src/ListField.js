import { connectField } from 'uniforms';
function List(props) {
    // return (
    //   <>
    //     <ListMaterial
    //       dense
    //       subheader={
    //         label ? (
    //           <ListSubheader disableSticky>{label}</ListSubheader>
    //         ) : undefined
    //       }
    //       {...filterDOMProps(props)}
    //     >
    //       {value?.map((item, itemIndex) =>
    //         Children.map(children, (child, childIndex) =>
    //           isValidElement(child)
    //             ? cloneElement(child, {
    //                 key: `${itemIndex}-${childIndex}`,
    //                 name: child.props.name?.replace('$', '' + itemIndex),
    //                 ...itemProps,
    //               })
    //             : child
    //         )
    //       )}
    //     </ListMaterial>
    //     <ListAddField icon={addIcon} initialCount={initialCount} name="$" />
    //   </>
    // );
    return null;
}
export default connectField(List);
