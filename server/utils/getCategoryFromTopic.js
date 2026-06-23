const newsTopics =
  require("../config/newsTopics");

const states = require("../config/states");



const getCategoryFromTopic = (
  topic
) => {

  const lowerTopic =
    topic.toLowerCase();

  for (const state of states) {

    if (
      lowerTopic.includes(state)
    ) {

      return "state";

    }

  }

  for (const category in newsTopics) {

    const topics =
      newsTopics[category];



    for (const item of topics) {

      if (
        lowerTopic.includes(
          item.toLowerCase()
        )
      ) {

        return category;

      }

    }

  }

  return "state";

};

module.exports =
  getCategoryFromTopic;