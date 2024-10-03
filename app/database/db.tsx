import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { LotteryType } from '../types/lottery';

const openDb = async () => {
    return open({
        filename: './database.sqlite',
        driver: sqlite3.Database,
    });
};

// Function to get win count by slug (drwNo)
export const getWinNo = async (slug: string) => {
    const db = await openDb();

    const result = await db.get(`SELECT * FROM lottery WHERE drwNo = ?`, [slug]);

    await db.close();
    return result;
};

export const insertData = async (dataArray: LotteryType[]) => {
    const db = await openDb();

    await db.run(`CREATE TABLE IF NOT EXISTS lottery (
    drwNo INTEGER PRIMARY KEY,
    drwNoDate TEXT,
    totSellamnt INTEGER,
    firstWinamnt INTEGER,
    firstPrzwnerCo INTEGER,
    firstAccumamnt INTEGER,
    drwtNo1 INTEGER,
    drwtNo2 INTEGER,
    drwtNo3 INTEGER,
    drwtNo4 INTEGER,
    drwtNo5 INTEGER,
    drwtNo6 INTEGER,
    bnusNo INTEGER
  )`);

    const insertStatement = `INSERT OR REPLACE INTO lottery (
    drwNo, drwNoDate, totSellamnt, firstWinamnt, firstPrzwnerCo, firstAccumamnt,
    drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6, bnusNo
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    for (const data of dataArray) {
        await db.run(insertStatement, [
            data.drwNo,
            data.drwNoDate,
            data.totSellamnt,
            data.firstWinamnt,
            data.firstPrzwnerCo,
            data.firstAccumamnt,
            data.drwtNo1,
            data.drwtNo2,
            data.drwtNo3,
            data.drwtNo4,
            data.drwtNo5,
            data.drwtNo6,
            data.bnusNo,
        ]);
    }

    await db.close();
};
