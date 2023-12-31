const express = require("express");
const db = require("../db");
const router = express.Router();
const utils = require('./utils')

// router.post('/likeQuotes',(request, response) => {
//   const cred = request.body
//   db.query(
//     `insert into Favquotes (user_id,quote_id)
//     select ?,? from dual where not exists(select 2 from quotes where
//         user_id=? and id=? )`,[cred.user_id, cred.id,cred.user_id, cred.id],
//     (error, result) => {
  // response.send(utils.createResult(error, result))
//     }
//   )
// }
// )

// router.delete("/deleteFavQuotes/:user_id/:quote_id", (request, response) => {
//   db.query( 
//     `START TRANSACTION;
//     DELETE FROM Favquotes WHERE quote_id = ? AND user_id = ?,
//     UPDATE quotes SET likescount = likescount - 1 WHERE id = ?,
//     COMMIT;,`
//     [request.params.quote_id, request.params.user_id,request.params.quote_id],
//     (error, result) => {
//       response.send(utils.createResult(error, result))
//     }
//   );
// });

router.delete("/deleteFavQuotes/:user_id/:quote_id", (request, response) => {
  db.query("START TRANSACTION", (startTransactionError) => {
    if (startTransactionError) {
      console.log(startTransactionError);
      response.setHeader("Content-Type", "application/json");
      response.send(startTransactionError);
      return;
    }

    db.query(
      "DELETE FROM Favquotes WHERE quote_id = ? AND user_id = ?",
      [request.params.quote_id, request.params.user_id],
      (deleteError, deleteResult) => {
        if (deleteError) {
          console.log(deleteError);
          db.query("ROLLBACK", (rollbackError) => {
            if (rollbackError) {
              console.log("Rollback Error:", rollbackError);
            }
            response.setHeader("Content-Type", "application/json");
            response.send(deleteError);
          });
          return;
        }

        db.query(
          "UPDATE quotes SET likescount = likescount - 1 WHERE id = ?",
          [request.params.quote_id],
          (updateError, updateResult) => {
            if (updateError) {
              console.log(updateError);
              db.query("ROLLBACK", (rollbackError) => {
                if (rollbackError) {
                  console.log("Rollback Error:", rollbackError);
                }
                response.setHeader("Content-Type", "application/json");
                response.send(updateError);
              });
              return;
            }

            db.query("COMMIT", (commitError) => {
              if (commitError) {
                console.log("Commit Error:", commitError);
                db.query("ROLLBACK", (rollbackError) => {
                  if (rollbackError) {
                    console.log("Rollback Error:", rollbackError);
                  }
                  response.setHeader("Content-Type", "application/json");
                  response.send(commitError);
                });
                return;
              }

              response.setHeader("Content-Type", "application/json");
              response.send("Successfully deleted and updated");
            });
          }
        );
      }
    );
  });
});

router.get("/getFavQuotes/:user_id", (request, response) => {
  db.query(
    `select Favquotes.quote_id,text,author,createdDate 
    from Favquotes join quotes on Favquotes.quote_id = quotes.id where Favquotes.user_id=?`,
    [request.params.user_id],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  );
});

router.get("/likescount", (request, response) => {
  db.query(
    `select count(quote_id) as count,quote_id from Favquotes group by quote_id;`,
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  );
});

router.post("/likeQuotes", (request, response) => {
  const cred = request.body;

  db.query("START TRANSACTION", (startTransactionError) => {
    if (startTransactionError) {
      console.log(startTransactionError);
      response.setHeader("Content-Type", "application/json");
      response.send(startTransactionError);
      return;
    }

    db.query(
      "SELECT * FROM Favquotes WHERE user_id = ? AND quote_id = ?",
      [cred.user_id, cred.id],
      (selectError, selectResult) => {
        if (selectError) {
          console.log(selectError);
          db.query("ROLLBACK", () => {
            response.setHeader("Content-Type", "application/json");
            response.send(selectError);
          });
          return;
        }

        if (selectResult.length > 0) {

          db.query("COMMIT", (commitError) => {
            if (commitError) {
              db.query("ROLLBACK", () => {
                console.log(commitError);
                response.setHeader("Content-Type", "application/json");
                response.send(commitError);
              });
              return;
            }
            var data = JSON.stringify({ message: "Quote already liked by this user" });
            response.send(data);
          });
        } else {
          db.query(
            "UPDATE quotes SET likescount = likescount+1 WHERE id = ?",
            [cred.id],
            (updateError, updateResult) => {
              if (updateError) {
                console.log(updateError);
                db.query("ROLLBACK", () => {
                  response.setHeader("Content-Type", "application/json");
                  response.send(updateError);
                });
                return;
              }
              db.query(
                "INSERT INTO Favquotes (user_id, quote_id) VALUES (?, ?)",
                [cred.user_id, cred.id],
                (insertError, insertResult) => {
                  if (insertError) {
                    console.log(insertError);
                    db.query("ROLLBACK", () => {
                      response.setHeader("Content-Type", "application/json");
                      response.send(insertError);
                    });
                    return;
                  }
                  db.query("COMMIT", (commitError) => {
                    if (commitError) {
                      db.query("ROLLBACK", () => {
                        console.log(commitError);
                        response.setHeader("Content-Type", "application/json");
                        response.send(commitError);
                      });
                      return;
                    }
                    var data = JSON.stringify({ message: "Quote liked successfully" });
                    response.send(data);
                  });
                }
              );
            }
          );
        }
      }
    );
  });
});

module.exports = router;
