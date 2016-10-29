'use strict'

// Globals
import React, { Component } from 'react'
import _ from 'lodash'

export default class CharVideoComponent extends Component {
	constructor() {
	  super();
	  this.state = {html: ''}
	  this.setState = this.setState.bind(this);
	  this.outputWidth = 100
	  this.outputHeight = 40
	}

	componentDidMount() {
		let options = {
			outputWidth: this.props.charWidth, 
			outputHeight: this.props.charHeight,
			charSet: this.props.charSet
		}

		// update the character video
		setInterval(function() {
			getHTMLFromVideo(this.video, this.canvas, this.setState, options)	
		}.bind(this), this.props.frameInterval)
		getHTMLFromVideo(this.video, this.canvas, this.setState, options)
	}

	// plays a hidden video element
	// uses a canvas to pull image from video and convert to styled characters
  render() {
  	let innerHTML = {__html: this.state.html}
    return(
      <div>
      	<video className="hidden" src={this.props.src} ref={((v) => { this.registerVideo(v) }).bind(this)}/>
      	<canvas className="hidden canvas" ref={((c) => { this.registerCanvas(c) }).bind(this)} />
      	<div className="char-video" dangerouslySetInnerHTML={innerHTML}></div>
      </div>
    )
  }

  registerVideo(video) {
  	if (video) {
  		video.play()
  		this.video = video
  	}
  }

  registerCanvas(canvas) {
  	this.canvas = canvas
  }
}

let getHTMLFromVideo = function(video, canvas, setState, options) {
	if (!video) { return }

	let sourceWidth = video.videoWidth
	let sourceHeight = video.videoHeight
	let ctx = canvas.getContext('2d');
	// draw a still image from video into the canvas
	ctx.drawImage(video, 0, 0, sourceWidth, sourceHeight, 0, 0, options.outputWidth, options.outputHeight)

	let html = ''

	// grab canvas image as data array and convert to characters
	try {
		let data = ctx.getImageData(0, 0, options.outputWidth, options.outputHeight).data
		let span = ''
		let spanIndex = 0
		for (let i = 0; i < data.length; i = i + 4) {
			// skip 4 because data is r, g, b, a, r, g, b, a, ...
			span = getSpan(data[i], data[i+1], data[i+2], options.charSet)
			if (spanIndex % options.outputWidth === 0) {
				html = html.concat('<br/>')
			}
			html = html.concat(span)
			spanIndex++
		}
		setState({html: html})
	} catch (err) {
		console.log(err)
	}
}

// r, g, b are integers between 0 and 255
let getSpan = function(r, g, b, chars) {
	let intensity = 0.21*r + 0.72*g + 0.07*b // luminosity rgb to grayscale
	intensity = intensity / 255
	let index = Math.floor(intensity * chars.length) // make sure we use full range of chars
	let char = chars[index]
	let color = '#' + r.toString(16) + g.toString(16) + b.toString(16)
	let span = '<span class="view" style="color: ' + color +'">' + char + '</span>'
	return span
}
