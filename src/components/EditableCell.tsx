import * as React from "react";

export interface EditableProps {
    classNames: string;
    value?: string;
    placeholder?: string;
    updater: (any) => void;
}
export interface EditableState {
    editMode: boolean;
    value: string;
}
export class EditableCell extends React.Component<EditableProps,EditableState> {
    constructor(props: EditableProps) {
        super(props);
        const defaultValue = this.props.value ? this.props.value : '';
        this.state = {
            editMode: false,
            value: defaultValue
        };
    }
    componentDidUpdate(prevProps) {
      if(this.state.editMode) {
          const field: any = this.refs['editableField'];//ReactDOM.findDOMNode();
          console.log(field);
          field.focus();
      }
    }
    render() {
        const editMode = () => {
            const state = this.state;
            state.editMode = true;
            this.setState(state);
        }
        const edit = (event) => {
            const value = event.target.value;
            const state = this.state;
            state.value = value;
            this.setState(state);
        };
        const unEdit = () => {
            const state = this.state;
            state.editMode = false;
            if(!this.props.updater(this.state.value)) {
                state.value = this.props.value ? this.props.value : '';
            }
            this.setState(state);
        }
        const onEnter = (event) => {
            if (event.keyCode == 13) {
                const field: any = this.refs['editableField'];//ReactDOM.findDOMNode(this.refs['editableField']);
                field.blur();
            }
        }
        if(this.state.editMode) {
            return <td className=''><input onKeyDown={onEnter} onBlur={unEdit} onChange={edit} ref='editableField' className='form-control' type='text' value={this.state.value}/></td>;
        } else if(this.props.placeholder) {
            return <td onClick={editMode} className={this.props.classNames}><em>{this.props.placeholder}</em></td>;
        } else {
            return <td onClick={editMode} className={this.props.classNames}>{this.props.value}</td>;
        }
    }
}
