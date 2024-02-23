import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from '../../../../node_modules/reactstrap/es/utils';

var _excluded = ["className", "cssModule", "children", "toggle", "tag", "wrapTag", "closeAriaLabel", "charCode", "close"];
var propTypes = {
  tag: tagPropType,
  wrapTag: tagPropType,
  toggle: PropTypes.func,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.node,
  closeAriaLabel: PropTypes.string,
  charCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  close: PropTypes.object
};
var defaultProps = {
  tag: 'h4',
  wrapTag: 'div',
  closeAriaLabel: 'Close',
  charCode: 215
};

var CustomModalHeader = function CustomModalHeader(props) {
  var closeButton;

  var className = props.className,
      cssModule = props.cssModule,
      children = props.children,
      toggle = props.toggle,
      Tag = props.tag,
      WrapTag = props.wrapTag,
      closeAriaLabel = props.closeAriaLabel,
      charCode = props.charCode,
      close = props.close,
      attributes = _objectWithoutPropertiesLoose(props, _excluded);

  var classes = mapToCssModules(classNames(className, 'modal-headerr'), cssModule);

  if (!close && toggle) {
    var closeIcon = typeof charCode === 'number' ? String.fromCharCode(charCode) : charCode;
    closeButton = /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: toggle,
      className: mapToCssModules('close', cssModule),
      "aria-label": closeAriaLabel
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, closeIcon));
  }

  return /*#__PURE__*/React.createElement(WrapTag, _extends({}, attributes, {
    className: classes
  }), /*#__PURE__*/React.createElement(Tag, {
    className: mapToCssModules('modal-title', cssModule)
  }, children), close || closeButton);
};

CustomModalHeader.propTypes = propTypes;
CustomModalHeader.defaultProps = defaultProps;
export default CustomModalHeader;