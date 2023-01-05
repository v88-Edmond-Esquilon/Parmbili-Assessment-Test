/*  DOCU: Show or hide the selected modal 
    Triggered: inside render() 
*/
export const toggleShowModal = (component_selector, modal_name, is_show) => {
    return component_selector.setState({[modal_name]: is_show });
}