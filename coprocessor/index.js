const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Handle POST requests only, see the Router docs:
// https://www.apollographql.com/docs/router/customizations/coprocessor
app.post("/", (req, res) => {
    const request = req.body;
    console.log('Coprocessor called:', 'stage', request['stage'], 'id', request['id']);
    
    if (request['stage'] === 'RouterRequest') {
        // operation_kind isn't available as the operation isn't parsed in this coprocessor stage
        console.log(JSON.stringify(request, null, 2));
    }

    const isSubscription = request.context?.entries?.operation_kind === 'subscription';

    if (request['stage'] === 'RouterResponse') {
        if (isSubscription) {
            console.log('Received a subscription event!');
            console.info('Response Body:', JSON.stringify(request.body, null, 2));
            console.info('Response Context:', JSON.stringify(request.context, null, 2));
        }
    }

    if (request['stage'] === 'SupergraphRequest') {
        if (isSubscription) {
            console.log('Received a subscription event!');
            console.info('Response Body:', JSON.stringify(request.body, null, 2));
            console.info('Response Context:', JSON.stringify(request.context, null, 2));
        }
    }

    if (request['stage'] === 'SupergraphResponse') {
        if (isSubscription) {
            console.log('Received a subscription event!');
            console.info('Response Body:', JSON.stringify(request.body, null, 2));
            console.info('Response Context:', JSON.stringify(request.context, null, 2));
        }
    }

    // Not doing any modification or disruptions
    res.json(request);
});

app.listen(port, () => {
    console.log(`🚀 Coprocessor running on port ${port}.`);
});
