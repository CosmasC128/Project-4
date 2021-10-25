import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))

// *** This is for upload profile images for users and businesses
// *** You must remember to include the enctype property in the form tag for the uploaded file to be attached to the request properly.
{/* <form method="post" enctype="multipart/form-data">
  {% csrf_token %}
  {{ form.as_p }}
  <button type="submit">Upload</button>
</form>

{% if img_obj %}
  <h3>Succesfully uploaded : {{img_obj.title}}</h3>
  <img src="{{ img_obj.image.url}}" alt="connect" style="max-height:300px">
{% endif %} */}