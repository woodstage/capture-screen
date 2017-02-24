// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { desktopCapturer } from 'electron';
import styles from './Home.scss';
import Video from './Video';


export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = { videoSources: [] };
  }

  componentDidMount(){
    desktopCapturer.getSources({types: ['screen']}, (err, sources) => {
      if(err){
        console.error(error);
        return;
      }
      this.setState({ videoSources: sources.map(src => {
        src.thumbnail = src.thumbnail.toDataURL();
        return src;
      }) });
    })
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          {
            this.state.videoSources.map(s => {
              return <Video key={s.id} resource={s}/>
            })
          }
        </div>
      </div>
    );
  }
}
