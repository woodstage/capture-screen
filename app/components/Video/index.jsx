import React, { Component, PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import styles from './index.scss';

class Video extends Component {

  constructor(props){
    super(props);
    this.state = { src : null, opened: false };
    this.openVideo = this.openVideo.bind(this);
    this.handleStream = this.handleStream.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleToggleOpen = this.handleToggleOpen.bind(this);
  }

  openVideo(){
    navigator.webkitGetUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: this.props.resource.id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        },
        }, this.handleStream, this.handleError)
  }

  closeVideo(){
    this.setState({
      src: null
    })
  }

  handleStream(stream){
    this.setState({ src: URL.createObjectURL(stream)});
  }

  handleError(e){
    console.log(e);
  }

  handleToggleOpen(event){
    event.stopPropagation();
    event.preventDefault();
    let opened = !this.state.opened;
    let resouceId = this.props.resource.id;

    if(opened){
      this.openVideo();
    }else{
      this.closeVideo();
    }

    this.setState({
      opened
    })
  }

  render() {
    let { src, opened } = this.state;
    return (
      <div className={styles.video} data-model={ opened ? 'opened' : ''}>
        { opened ? <video autoPlay src={src}></video> : <img src={this.props.resource.thumbnail}/>}
        <input type="checkbox" checked={opened} onClick={this.handleToggleOpen}/>
      </div>
    )
  }
}

Video.propTypes = {
  resource: PropTypes.object.isRequired
}

export default Video;
