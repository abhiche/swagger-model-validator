/**
 * Created by bdunn on 18/09/2014.
 */
var Validator = require('../lib/modelValidator');
var validator = new Validator();

module.exports.validationTests = {
    invalidIntegerTypeTest: function(test) {
        var data = {
            id: 'sample'
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(2);
        test.ok(!errors.valid);
        test.ok(errors.errors[0].message === 'id (sample) is not a type of integer', 'message: ' + errors.errors[0].message);

        test.done();
    },
    invalidIntegerBlankTest: function(test) {
        var data = {
            id: ""
        };
        var model = {
            required: [],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(2);
        test.ok(!errors.valid);
        test.ok(errors.errors[0].message === 'id ({empty string}) is not a type of integer', errors.errors[0].message);

        test.done();
    },
    invalidIntegerBlankWhenRequiredTest: function(test) {
        var data = {
            id: ""
        };
        var model = {
            required: ['id'],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(2);
        test.ok(!errors.valid);
        test.ok(errors.errors[0].message === 'id is a required field');

        test.done();
    },
    validIntegerTypeTest: function(test) {
        var data = {
            id: 1
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(1);
        test.ok(errors.valid);

        test.done();
    },
    validInteger32TypeTest: function(test) {
        var data = {
            id: 1
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(1);
        test.ok(errors.valid);

        test.done();
    },
    validInteger64TypeTest: function(test) {
        var data = {
            id: 3000000000
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int64'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(1);
        test.ok(errors.valid);

        test.done();
    }
};