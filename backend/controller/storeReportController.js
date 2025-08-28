import connection from "../config/db.js";

export const storeTestReport = async (req, res) => {
  const { result, id, topic, score, difficulty, totalMarks } = req.body;
  if (!result || !id || !topic || score===undefined || difficulty===undefined || totalMarks===undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const sql = `INSERT INTO TestReports (user_id, testName, score, totalMarks, difficulty, result) VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [id, topic, score, totalMarks, difficulty, result], (err, result) => {
    if (err) {
      console.error('Error saving result:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ message: 'Result saved successfully', resultId: result.insertId });
  });
};

// Get all test data of specific user without report
export const getUserTestData = async (req, res) => {
  const { user_id } = req.params;
  const sql = `SELECT id,testName,difficulty,totalMarks,score,dateTaken FROM TestReports where user_id = ?`;

  connection.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching results:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(results);
  });
};

  // Get report for specific test to avoid database overload
 export const getSpecificReport = async (req, res) => {
  
    const { id } = req.params;
    console.log(id)
    const sql = `SELECT result FROM TestReports where id = ?`;
  
    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error fetching results:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json(result);
    });
  };
  








