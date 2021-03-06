var React = require('react');
var Classable = require('./mixins/classable.js');
var Icon = require('./icon.jsx');
var Toggle = require('./toggle.jsx');

var Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER',
  NESTED: 'NESTED'
};

var MenuItem = React.createClass({

  mixins: [Classable],

  propTypes: {
    index: React.PropTypes.number.isRequired,
    icon: React.PropTypes.string,
    iconRight: React.PropTypes.string,
    attribute: React.PropTypes.string,
    number: React.PropTypes.string,
    data: React.PropTypes.string,
    toggle: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  statics: {
    Types: Types
  },

  getDefaultProps: function() {
    return {
      toggle: false
    };
  },

  render: function() {
    var classes = this.getClasses('mui-menu-item', {
      'mui-is-selected': this.props.selected
    });
    var icon;
    var data;
    var iconRight;
    var attribute;
    var number;
    var toggle;

    if (this.props.icon) icon = <Icon className="mui-menu-item-icon" icon={this.props.icon} />;
    if (this.props.data) data = <span className="mui-menu-item-data">{this.props.data}</span>;
    if (this.props.iconRight) iconRight = <Icon className="mui-menu-item-icon-right" icon={this.props.iconRight} />;
    if (this.props.number !== undefined) number = <span className="mui-menu-item-number">{this.props.number}</span>;
    if (this.props.attribute !== undefined) attribute = <span className="mui-menu-item-attribute">{this.props.attribute}</span>;
    
    if (this.props.toggle) {
      var {
        toggle,
        onClick,
        onToggle,
        children,
        label,
        ...other
      } = this.props;
      toggle = <Toggle {...other} onToggle={this._handleToggle}/>;
    }

    return (
      <div
        key={this.props.index}
        className={classes}
        onTouchTap={this._handleTouchTap}>

        {icon}
        {this.props.children}
        {data}
        {attribute}
        {number}
        {toggle}
        {iconRight}
        
      </div>
    );
  },

  _handleTouchTap: function(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.index);
  },

  _handleToggle: function(e, toggled) {
    if (this.props.onToggle) this.props.onToggle(e, this.props.index, toggled);
  }

});

module.exports = MenuItem;