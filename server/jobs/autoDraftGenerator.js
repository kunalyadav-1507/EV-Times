const ExternalNews =
    require("../models/ExternalNews");

const generateDraft =
    require("../services/generateDraft");

const autoDraftGenerator =
    async () => {

        try {

            console.log(
                "Auto Draft Generator Started"
            );

            const categories = [
                "ev",
                "bms",
                "international"
            ];

            for (const category of categories) {

                const newsList =
                    await ExternalNews.find({

                        category,

                        status: "raw",

                        processed: false

                    })

                        .sort({
                            views: -1,
                            publishedAt: -1
                        })

                        .limit(3);

                for (const news of newsList) {

                    await generateDraft(news);
                    await new Promise(resolve =>
                        setTimeout(resolve, 5000)
                    );

                    console.log(
                        `Draft Generated: ${news.title}`
                    );

                }

            }
            const stateCounts =
                await ExternalNews.aggregate([

                    {
                        $match: {
                            category: "state",
                            status: "published"
                        }
                    },

                    {
                        $group: {
                            _id: "$stateName",
                            count: {
                                $sum: 1
                            }
                        }
                    }

                ]);

            const stateCountMap = {};

            stateCounts.forEach(state => {

                stateCountMap[state._id] =
                    state.count;

            });

            const stateNews =
                await ExternalNews.find({

                    category: "state",

                    status: "raw",

                    processed: false

                });

            stateNews.sort((a, b) => {

                const countA =
                    stateCountMap[
                    a.stateName
                    ] || 0;

                const countB =
                    stateCountMap[
                    b.stateName
                    ] || 0;

                return countA - countB;

            });

            const usedStates =
                new Set();

            let generatedCount = 0;

            for (const news of stateNews) {

                if (
                    usedStates.has(
                        news.stateName
                    )
                ) continue;

                await generateDraft(news);
                await new Promise(resolve =>
                    setTimeout(resolve, 5000)
                );

                console.log(
                    `State Draft Generated: ${news.stateName}`
                );

                usedStates.add(
                    news.stateName
                );

                generatedCount++;

                if (
                    generatedCount === 3
                ) break;

            }

        }

        catch (error) {

            console.log(error);

        }

    };

module.exports =
    autoDraftGenerator;