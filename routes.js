const router = require("express").Router();
const wrapper = require("../server");

//logstash inputs API's
router.get("/logstash/inputs", wrapper.inputsWrapper.getAllInputs);
router.post("/logstash/inputs", wrapper.inputsWrapper.addInput);
router.put("/logstash/inputs/:inputName", wrapper.inputsWrapper.editInput);
router.get("/logstash/inputs/:inputName", wrapper.inputsWrapper.getInputByName);
router.delete("/logstash/inputs/:inputName", wrapper.inputsWrapper.deleteInput);


//logstash outputs API's
router.get("/logstash/outputs", wrapper.outputsWrapper.getAllOutputs);
router.post("/logstash/outputs", wrapper.outputsWrapper.addOutput);
router.put("/logstash/outputs/:outputName", wrapper.outputsWrapper.editOutput);
router.get(
  "/logstash/outputs/:outputName",
  wrapper.outputsWrapper.getOutputByName
);
router.delete(
  "/logstash/outputs/:outputName",
  wrapper.outputsWrapper.deleteOutput
);

//logstash pipelines API's
router.get("/logstash/pipelines", wrapper.pipelinesWrapper.getAllPipelines);
router.post("/logstash/pipelines", wrapper.pipelinesWrapper.addPipeline);
router.put(
  "/logstash/pipelines/:pipelineName",
  wrapper.pipelinesWrapper.editPipeline
);
router.get(
  "/logstash/pipelines/:pipelineName",
  wrapper.pipelinesWrapper.getPipelineByName
);
router.delete(
  "/logstash/pipelines/:pipelineName",
  wrapper.pipelinesWrapper.deletePipeline
);


//elasticsearch API's
router.delete("/elasticsearch/deleteElasticSearchIndex/:indexName", wrapper.elasticsearchWrapper.deleteElasticSearchIndex);
router.post("/elasticsearch/luceneSearch", wrapper.elasticsearchWrapper.luceneSearch);
router.post("/elasticsearch/dateRangeQuery", wrapper.elasticsearchWrapper.dateRangeQuery)
router.post("/elasticsearch/createElasticSearchIndex", wrapper.elasticsearchWrapper.createElasticSearchIndex)
router.post("/elasticsearch/dateRangeMonitoringMetrics", wrapper.elasticsearchWrapper.dateRangeMonitoringMetrics)
router.post("/elasticsearch/logInfo", wrapper.elasticsearchWrapper.logInfo)
router.post("/elasticsearch/securityConcern", wrapper.elasticsearchWrapper.securityConcern)
router.get("/elasticsearch/checkConnection", wrapper.elasticsearchWrapper.checkConnection)
router.get("/elasticsearch/systemType", wrapper.elasticsearchWrapper.systemType)
router.post("/elasticsearch/systemAnalysis", wrapper.elasticsearchWrapper.systemAnalysis)
router.post("/elasticsearch/accountType", wrapper.elasticsearchWrapper.accountType)


//Logstash filters API's
router.get("/logstash/filters", wrapper.filtersWrapper.getAllFilters);
router.post("/logstash/filters", wrapper.filtersWrapper.addFilters);
router.put("/logstash/filters/:filterName", wrapper.filtersWrapper.editFilter);
router.get(
  "/logstash/filters/:filterName",
  wrapper.filtersWrapper.getFilterByName
);
router.delete(
  "/logstash/filters/:filterName",
  wrapper.filtersWrapper.deleteFilter
);


//Kafka API's
router.post("/kafka/createTopic", wrapper.kafkaWrapper.createTopic)
router.get("/kafka/listAllTopics", wrapper.kafkaWrapper.listAllTopics)
router.post("/kafka/createProducer", wrapper.kafkaWrapper.createProducer)


//ElastAlert API's
router.get("/elastalert/rules", wrapper.elastAlertWrapper.getAllRules)
router.post("/elastalert/rules", wrapper.elastAlertWrapper.addRule)
router.delete("/elastalert/rules", wrapper.elastAlertWrapper.deleteRule)

module.exports = router;
