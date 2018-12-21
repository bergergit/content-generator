
import * as mongoose from 'mongoose';
import { expect, assert } from 'chai';
import chai = require('chai');
import chaiHttp = require('chai-http');
import { before, after } from 'mocha';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../server';
import { Menu } from '../models/Menu';
import { Field } from '../models/Field';

let mongoServer: MongoMemoryServer;

chai.use(chaiHttp);
chai.should();

before(async() => {
  mongoServer = new MongoMemoryServer();
  let mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, { useNewUrlParser: true });
});

after(async() => {
  mongoose.disconnect();
  mongoServer.stop();
});

afterEach(async() => {
  Menu.deleteMany({});
  Field.deleteMany({});
});

describe('API', () => {

  describe('MongoDB server', () => {
    
    it('should insert one Menu', async function() {
      let count = await Menu.countDocuments();

      count.should.equal(0);
    });
  });


  describe('Routes', () => {

    it('should return 1 menu', async function() {
      let dummyData = { 
        restField: 'restField1', title: 'Title1' 
      }
      
      try {
        await new Menu(dummyData).save();
        const count = await Menu.countDocuments();
        let response = await chai.request(app).get('/api/menusAndFields');

        count.should.equal(1);
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body.length.should.be.eql(1);
      } catch (err) {
        console.log('err', err);
        assert.fail('Error getting menus and Fields', err);
      }

    });
  });

});