import React from 'react';
import { Button, ButtonGroup, DropdownButton, MenuItem, Glyphicon, Dropdown } from 'react-bootstrap';
import controller from './controller.jsx';

class LanguageSelector extends React.Component {


  render () {
    const state = this.props.state;
    const ctrl = controller(state);
    const update = this.props.update;
    const saved = state.saved;
    const lang = ctrl.getLanguage().toUpperCase();
    const switchToEnglish = () => update(ctrl.setLanguage('en'));
    const switchToFinnish = () => update(ctrl.setLanguage('fi'));
    return <ButtonGroup className="pull-right">
                <Dropdown id="language-selector">
                    <Dropdown.Toggle bsStyle={"link"}>
                        <Glyphicon glyph="globe" />&nbsp;{lang}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MenuItem eventKey="1" onClick={switchToEnglish} bsStyle={"link"}>EN</MenuItem>
                        <MenuItem eventKey="2" onClick={switchToFinnish} bsStyle={"link"}>FI</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonGroup>;
  }
}

export default LanguageSelector;