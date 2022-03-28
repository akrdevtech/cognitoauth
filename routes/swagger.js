const swaggerUi =require('swagger-ui-express');
const YAML = require('yamljs');
const express = require('express');
const router = express.Router();

const getSwaggerSpecJson = () => {
    return YAML.load('./docs/openapi.yaml');
}

router.use('/doc', swaggerUi.serve, swaggerUi.setup(getSwaggerSpecJson()));

module.exports = router;
