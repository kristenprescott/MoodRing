import { useState } from "react";
import "../App.css";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";
// import SearchResults from '../components/SearchResults';
// import NobBoard from '../components/NobBoard';
// import ResultsList from '../components/ResultsList';

const PlaylistGenerator = ({ auth }) => {
  const { token } = auth;
  // Hooks:
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  // // For Genre seeds:
  // const [selectedGenres, setSelectedGenres] = useState([]);
  const [rangeValues, setRangeValues] = useState({});
  const [results, setResults] = useState(null);

  //
  const search = async () => {
    const url = "https://api.spotify.com/v1/search";
    const searchQuery = encodeURIComponent(searchString);
    const typeQuery = `type=artist`;
    // // for Genre seed(s):
    // const typeQuery = `type=genre`;
    const { data } = await axios.get(`${url}?q=${searchQuery}&{typeQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data && data.artists) {
      setSearchResults(data.artists.items);
    }
    // // for Genre:
    // if (data && data.genre) {
    //   setSearchResults(data.genre.items); // // (or something, maybe not .items)
    // }
  };

  const getRecommendations = async () => {
    const url = "https://api.spotify.com/v1/recommendations";

    // get artists:
    let selectedArtistsString;
    if (selectedArtists.length < 0) {
      return;
    } else {
      selectedArtistsString = `seed_artists=${selectedArtists.join(",")}`;
    }

    // get range values:
    let min = [];
    let max = [];
    Object.keys(rangeValues).forEach((rangeValue) => {
      if (rangeValues[rangeValue].enabled) {
        // then we add our max/min values
        min.push(`min_${rangeValue}=${rangeValues[rangeValue].value[0]}`);
        max.push(`max_${rangeValue}=${rangeValues[rangeValue].value[1]}`);
      }
    });
    const minString = min.join("&");
    const maxString = max.join("&");

    console.log(
      "url: ",
      `${url}?${selectedArtistsString}&${minString}&${maxString}`
    );

    const { data } = await axios.get(
      `${url}?${selectedArtistsString}&${minString}&${maxString}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setResults(data);
  };

  // // getGenreRecommendations:
  // const getGenreRecommendations = async () => {
  //   const url = "https://api.spotify.com/v1/recommendations";

  //   // get artists:
  //   let selectedGenresString;
  //   if (selectedGenres.length < 0) {
  //     return;
  //   } else {
  //     selectedGenresString = `genres=${selectedGenres.join(",")}`;
  //   }

  //   // get range values:
  //   let min = [];
  //   let max = [];
  //   Object.keys(rangeValues).forEach((rangeValue) => {
  //     if (rangeValues[rangeValue].enabled) {
  //       // then we add our max/min values
  //       min.push(`min_${rangeValue}=${rangeValues[rangeValue].value[0]}`);
  //       max.push(`max_${rangeValue}=${rangeValues[rangeValue].value[1]}`);
  //     }
  //   });
  //   const minString = min.join("&");
  //   const maxString = max.join("&");

  //   console.log("url: ", `${url}?${selectedGenresString}&${minString}&${maxString}`);

  //   const { data } = await axios.get(
  //     `${url}?${selectedGenresString}&${minString}&${maxString}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );

  //   setResults(data);
  // };

  // search based on artist(s) seeds:
  const searchSpotify = async () => {
    const url = "https://api.spotify.com/v1/search";
    const searchQuery = encodeURIComponent(searchString);
    const typeQuery = `type=artist`;
    const { data } = await axios.get(`${url}?q=${searchQuery}&${typeQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data: ", data);

    if (data && data.artists) {
      setSearchResults(data.artists.items);
    }
  };
  // // search based on genre(s) seeds:
  // const searchSpotify = async () => {
  //   const url = "https://api.spotify.com/v1/search";
  //   const searchQuery = encodeURIComponent(searchString);
  //   const typeQuery = `type=genre`;
  //   const { data } = await axios.get(`${url}?q=${searchQuery}&${typeQuery}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log("data:", data);

  //   if (data && data.genres) {
  //     setSearchResults(data.genres.items); // items?
  //   }
  // };

  return (
    <div className="PlaylistGenerator">
      <div className="title-wrapper">
        <p className="title">MoodRing</p>
      </div>

      {/* <p className="loggedin">You are logged in.</p> */}

      <div className="">
        <div className="">
          {selectedArtists.map((artist, idx) => (
            <div className="">
              {idx + 1}. {artist}
            </div>
          ))}
        </div>

        {/* <div
          className="searchbar"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search for an artist..."
            // placeholder="Search for a genre..."
            style={{
              cursor: "auto",
              height: "50px",
              width: "400px",
              padding: "12px",
              border: "1px solid #e0e2e5",
              borderRadius: "6px",
            }}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            value={searchString}
          />
          <div className="btn-container">
            <button
              className="search-btn"
              style={{
                backgroundColor: "#fff",
                margin: "0 auto",
                cursor: "pointer",
                border: "1px solid #e0e2e5",
                borderRadius: "5px",
                padding: "12px",
                width: "100px",
                height: "50px",
                color: "gainsboro",
                fontSize: "2.6rem",
              }}
              onClick={searchSpotify}
            >
              Search
            </button>
          </div>
        </div> */}

        <div
          className="search-container"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            variant={"outlined"}
            label={"Search"}
            style={{
              backgroundColor: "white",
              border: "1px solid gainsboro",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
            fullWidth
            onChange={(event) => setSearchString(event.target.value)}
            value={searchString}
          />
          <Button
            style={{
              backgroundColor: "gainsboro",
              borderTopRightRadius: "9px",
              borderBottomRightRadius: "9px",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          >
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistGenerator;
