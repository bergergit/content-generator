
import * as mongoose from 'mongoose';
import { expect, assert } from 'chai';
import chai = require('chai');
import chaiHttp = require('chai-http');
import { before, after } from 'mocha';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Server } from '../app';
import { Menu } from '../models/Menu';
import { Field } from '../models/Field';

let mongoServer: MongoMemoryServer;

chai.use(chaiHttp);
chai.should();

let server = new Server();
server.initialize();

const request = chai.request.agent(server.expressApp);

before(async() => {
  mongoServer = new MongoMemoryServer();
  let mongoUri = await mongoServer.getConnectionString();
  const db = await mongoose.connect(mongoUri, { useNewUrlParser: true });
});

after(async() => {
  await server.close();
  await request.close();
  await mongoose.disconnect();
  await mongoServer.stop();
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
        const doc = await new Menu(dummyData).save();
        const count = await Menu.countDocuments();
        let response = await request.get('/api/menusAndFields');

        doc.should.not.be.null;

        count.should.equal(1);
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body.length.should.be.eql(1);

      } catch (err) {
        console.log(err);
        assert.fail('', '', 'Error getting menus and Fields');
      }

    });

    it('should insert 1 menu', async function() {
      let dummyData = { 
        restField: 'restField1', title: 'Title1' 
      }

      try {
        let response = await request.post('/api/menu').send({
          restField: 'restField2',
          title: 'My title'
        });

        response.should.not.be.null;
        response.body.restField.should.be.equal('restField2');
        response.body.title.should.be.equal('My title');
      } catch (err) {
        console.log(err);
        assert.fail('', '', 'Error inserting menu'); 
      }
    });

    it ('should exit', () => {
      expect(true).to.be.true;
    });

  });

});