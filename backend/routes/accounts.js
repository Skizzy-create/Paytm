const express = require('express');
const { authMiddleware } = require('../middlewares/middlewares');
const { authenticateToken } = require('../auth/auth');
const { accountModel } = require('../database/db');
const { default: mongoose } = require('mongoose');
const { validateAccountTransfer } = require('../middlewares/validators');

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const id2 = req.user.id;
    // const id2 = res.user.id;
    console.info("Balance Route Called");
    try {
        const accountDetails = await accountModel.findOne({
            userId: id2
        });
        if (accountDetails === null) {
            return res.status(404).json({
                msg: "User/Account not found Invalid Creds"
            });
        };
        // console.info("Account Details", accountDetails);
        const balance = accountDetails.balance;
        return res.status(200).json({
            balance: balance,
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Server Error --Account Balance Route",
            error: err
        });
    }
});

router.post('/transfer', validateAccountTransfer, authMiddleware, async (req, res) => {
    const sendersId = req.user.id;
    const reciverId = req.body.to;
    const amount = req.body.amount;
    try {
        // Initialize the session
        const session = await mongoose.startSession();
        // Starting the session
        session.startTransaction();

        const senderAccount = await accountModel.findOne({
            userId: sendersId,
        }).session(session);

        if (!senderAccount) {
            return res.status(400).json({
                message: "Invalid Account/ Creds",
            });
        }

        if (senderAccount.balance < amount) {
            return res.status(400).json({
                message: "Insufficient Balance",
            });
        }

        const reciverAccount = await accountModel.findOne({
            userId: reciverId
        }).session(session);

        if (reciverAccount === null) {
            return res.status(400).json({
                message: "Invalid account - NO USER FOUND"
            });
        }

        // perfomring the operations for the transfers.
        // we will not be needing any checks for the transctions,
        // as even if one of these fails the transction wont go ahead. 

        // deducting the money from the senders account
        await accountModel.updateOne({
            userId: sendersId
        }, {
            $inc: {
                balance: -amount
            }
        }).session(session);

        // adding the money to the recivers account
        await accountModel.updateOne({ userId: reciverId, }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();

        res.status(200).json({
            msg: "Transfer Sucessful"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Server Error --Transfer Route",
            error: err
        });
    }
});

module.exports = router;