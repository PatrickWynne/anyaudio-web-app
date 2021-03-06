import {actionType} from "../actions/nowPlayingActions";
import {removeDuplicateVideos} from "../utils/removeDuplicates";

const initialState = {videos: [], suggestedVideos: [], dispatchNext: false};

export function nowPlaying(state = initialState, action) {
  switch (action.type) {
    case actionType.videoAdd:
      let videos = state.videos.slice(0);
      videos.push(action.video);
      return {...state, videos: removeDuplicateVideos(videos)};

    case actionType.videoRemove:
      let newVideos = state.videos.filter(video => video.id !== action.video.id);
      return {...state, videos: newVideos};

    case actionType.playNext:
      return {...state, dispatchNext: true};

    case actionType.playedNext:
      return {...state, dispatchNext: false};

    case actionType.getSuggestions:
      let suggestions;
      if (action.suggestedVideos) {
        suggestions = action.suggestedVideos.slice(0, 5)
      } else {
        suggestions = [];
      }
      return {...state, suggestedVideos: suggestions};

    default:
      return state;
  }
}
