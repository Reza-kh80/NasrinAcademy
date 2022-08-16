import React, { Fragment } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
const MyDropdown = (props) => {
    const { handleChange, label, selectedValue, display, dataList, name, htmlFor, onBlur } = props;
    return (
        <Fragment >
            <FormGroup className="w-100">
                <Label for={htmlFor} className="text-primary  ml-1">{label}</Label>
                <Input id={htmlFor} type="select" name={name} value={selectedValue !== null ? selectedValue : undefined} onChange={handleChange} onBlur={onBlur}>
                    <option value="">{display}</option>
                    {dataList.map((item, index) =>
                        <option key={index} value={item.value}>{item.label}</option>
                    )}
                </Input>
            </FormGroup>
        </Fragment>
    );
}

export default MyDropdown;