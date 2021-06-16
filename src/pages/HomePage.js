import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setSpotifyToken } from "../store/spotifyToken/actions";
import { selectSPOTIFYToken } from "../store/spotifyToken/selectors";

import SpotifyPlayer from "react-spotify-web-playback";

export default function HomePage() {
  const dispatch = useDispatch();
  const token = useSelector(selectSPOTIFYToken);

  useEffect(() => {
    if (!token) {
      const data = getToken(window.location.hash);
      console.log(data.access_token);
      const spotifyToken = data.access_token;
      console.log("spotify token:", spotifyToken);
      dispatch(setSpotifyToken(spotifyToken));
    }
  }, [dispatch, token]);

  const getToken = (hash) => {
    const afterHashTag = hash.substring(1);
    const paramsInUrl = afterHashTag.split("&");
    const paramsSplit = paramsInUrl.reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
    return paramsSplit;
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to PlayList</h1>
      {!token && (
        <p style={{ textAlign: "center" }}>
          You have to{" "}
          <Link
            to="/login"
            activeStyle={{ color: "lightgreen", marginTop: "20px" }}
          >
            Login{" "}
          </Link>
          to gain access to the app
        </p>
      )}
      {token && (
        <SpotifyPlayer
          token={token}
          uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
        />
      )}
    </div>
  );
}
