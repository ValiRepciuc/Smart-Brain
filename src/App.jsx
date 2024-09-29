import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");

    // Ensure the bounding box is calculated relative to the displayed size
    const width = image.width; // Get displayed width
    const height = image.height; // Get displayed height

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
    console.log(box);
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // Use backend proxy to avoid CORS issues
  onBtnSubmit = () => {
    this.setState({ imageURL: this.state.input });
    console.log("click");

    fetch("https://smartbrainapi-wa0b.onrender.com/clarifai-api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input, // Pass the input image URL
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response) {
          this.displayFaceBox(this.calculateFaceLocation(response));

          // Fetch to update user entries in your backend
          fetch("https://smartbrainapi-wa0b.onrender.com/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user?.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState((prevState) => ({
                user: { ...prevState.user, entries: count },
              }));
            })
            .catch((err) =>
              console.log("Error updating user entries:", err)
            );
        }
      })
      .catch((err) => {
        console.log("Error with Clarifai API request:", err);
      });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div>
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onBtnSubmit={this.onBtnSubmit}
            />
            <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
