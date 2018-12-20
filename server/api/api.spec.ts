
import { expect } from 'chai'
import { before, after } from 'mocha';
import { MongoClient, Db } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

let con: MongoClient;
let db: Db;
let mongoServer: MongoMemoryServer;

before(async() => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  con = await MongoClient.connect(mongoUri);
  db = con.db(await mongoServer.getDbName());
});

after(async() => {
  if (con) con.close();
  if (mongoServer) mongoServer.stop();
});


describe('Single mongoServer', () => {


  it('should start mongo server', async () => {
    expect(db).to.not.be.null;
    const col = db.collection('test');
    let dummyData = [{ a: 1 }, { b: 1 }];
    const result = await col.insert(dummyData);
    // expect(result.result).to.deep.equal(dummyData);
    let colCount = await col.count({});
    expect(colCount).to.equal(2);
  });
});