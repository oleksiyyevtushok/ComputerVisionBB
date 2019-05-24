import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './BoxesField.css';
import Box from '../Box/Box';
import { delShape, chooseResize } from '../../actions/shapesActions';
import { saveCurrentImageShapes } from '../../actions/imagesActions';

import { setEmptyCurrEntity } from '../../actions/entitiesActions';
import store from '../../store';

class BoxesField extends Component {
  componentDidMount() {
    document.onkeyup = e => {
      if (e.ctrlKey && e.which === 90) {
        const shapes = store.getState().shapes.labeledShapes;
        this.props.delShape(this.props.currentImg, shapes.length - 1);
      }
    };
  }

  clickHandler = name => {
    this.props.chooseResize(name);
    this.props.setEmptyCurrEntity();
  };

  clickToDelHandler = (event, current, index) => {
    event.stopPropagation();
    if (window.confirm('Do you want to delete this box?')) {
      this.props.delShape(current, index);
      this.props.chooseResize('');
      if (this.props.match) {
        const { imgName } = this.props.match.params;
        this.props.saveCurrentImageShapes(imgName);
      }
    }
  };

  render() {
    const { shapes } = this.props;
    return (
      <div className="boxesField">
        <p>Bounding boxes</p>
        <div className="boxesList">
          {shapes.map(item => (
            <Box
              color={item.color}
              label={item.label}
              key={`${item.color}${item.x}${item.y}`}
              onClick={() => this.clickHandler(item.name)}
              onClickToDel={event =>
                this.clickToDelHandler(event, this.props.currentImg, item.index)
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shapes: state.shapes.labeledShapes,
  currentImg: state.images.currentImg,
});

export default connect(
  mapStateToProps,
  {
    delShape,
    saveCurrentImageShapes,
    chooseResize,
    setEmptyCurrEntity,
  },
)(withRouter(BoxesField));
