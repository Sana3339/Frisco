"use strict";

function Homepage() {
  return (
    <div>
      Welcome!
      <p>
      <a href="/cards">See trading cards here</a>
      </p>
      <img src="/static/img/balloonicorn.jpg"></img>
    </div>
  );
}

ReactDOM.render(<Homepage />, document.querySelector('#app'));
