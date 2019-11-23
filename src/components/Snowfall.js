import React, { Component } from 'react';

// Give some christmas feeling by overlaying everything with some snowflakes :D
// https://pajasevi.github.io/CSSnowflakes/
export default class Snowfall extends Component {
  render() {
    return (
      <div className="snowflakes" aria-hidden="true">
        <div className="snowflake">
        ❅
        </div>
        <div className="snowflake">
        ❆
        </div>
        <div className="snowflake">
        ❅
        </div>
        <div className="snowflake">
        ❆
        </div>
        <div className="snowflake">
        ❅
        </div>
        <div className="snowflake">
        ❆
        </div>
        <div className="snowflake">
          ❅
        </div>
        <div className="snowflake">
          ❆
        </div>
        <div className="snowflake">
          ❅
        </div>
        <div className="snowflake">
          ❆
        </div>
        <div className="snowflake">
          ❅
        </div>
        <div className="snowflake">
          ❆
        </div>
      </div>
    );
  }
}