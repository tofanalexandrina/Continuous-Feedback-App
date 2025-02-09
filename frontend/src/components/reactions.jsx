const Emotions = {
    HAPPY: 1,
    SAD: 2,
    SURPRISED: 3,
    CONFUSED: 4
  };
  
  function getEmotionText(value) {
    switch (value) {
      case Emotions.HAPPY:
        return 'Happy';
      case Emotions.SAD:
        return 'Sad';
      case Emotions.SURPRISED:
        return 'Surprised';
      case Emotions.CONFUSED:
        return 'Confused';
      default:
        return 'Unknown Emotion';
    }
  }
  
  export { Emotions, getEmotionText };