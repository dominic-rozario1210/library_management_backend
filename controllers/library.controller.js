import express from "express"

let books = [
    {
        "id": 1,
        "title": "Wings of Fire",
        "author": "A. P. J. Abdul Kalam",
        "category": "Biography",
        "totalCopies": 6,
        "availableCopies": 4
    }
]

let members = [
    {
        "id": 1,
        "name": "John",
        "email": "john@gmail.com",
        "phone": "9876543210"
    }

]

let borrowRecords = [
    {
        "memberId": 1,
        "borrowDate": "2026-07-05",
        "returnDate": "2026-07-12"
    }

];

let bookIdCounter = 2;
let memberIdCounter = 2;
let borrowIdCounter = 1;

export const addBook = (req, res) => {
    try {
        const { title, author, category, totalCopies } = req.body;

        if (!title || !author || !category || totalCopies === undefined) {
            return res.status(400).json({
                message: "missing required fields",
                requiredFields: ["title", "author", "category", "totalCopies"]
            })
        }

        const newBook = {
            id: bookIdCounter++,
            title,
            author,
            category,
            totalCopies: Number(totalCopies),
            availableCopies: Number(totalCopies)
        }

        books.push(newBook)

        res.status(200).json({
            message: "book added successfully",
            book: newBook
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const registerMember = (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "missing required details",
                reguiredDetails: ["name", "email", "phone"]
            })
        }
        const newMember = {
            id: memberIdCounter++,
            name,
            email,
            phone
        }

        members.push(newMember)

        res.status(200).json({
            message: "member added successfully",
            member: newMember
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const borrowBook = (req, res) => {
    try {
        const bookId = Number(req.params.bookId);
        const {memberId,borrowDate,returnDate} = req.body;

        if(!memberId || !borrowDate || !returnDate){
            return res.status(400).json({
                message:"missing required details",
                requiredDetails:["memberId","borrowDate","returnDate"]
            })
        }
        const book= books.find(b => b.id === bookId )
        if(!book){
            return res.status(400).json({message:"book not found"})
        }

        const member = members.find(m => m.id === Number(memberId))
        if(!member){
            return res.status(400).json({message:"member not found"})
        }

        if(book.availableCopies <= 0){
            return res.status(400).json({message:"copies not available"})
        }

        book.availableCopies-= 1;

        const newRecord ={
            id:borrowIdCounter ++,
            bookId,
            memberId,
            borrowDate,
            returnDate,
            status:"borrowed"
        }
        borrowRecords.push(newRecord)
        res.status(200).json({
            message:"book successfully borrowed",
            borrowedBook:newRecord
        })


    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const returnBook = (req,res) =>{
    try {
        const borrowId = Number(req.params.borrowId);
        const record = borrowRecords.find(b => b.id === borrowId);

        if (!record){
            return res.status(400).json({message:"borrow record not found"})
        }

        if (record.status == "returned"){
            return res.status(400).json({message:"book already returned"})
        }

        const book = books.find(b => b.id === record.bookId)
        if(book){
            book.availableCopies += 1;
        }
        record.status = "returned"

        res.status(200).json({
            message:"book returned successfully",
            borrowRecord:record
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllBooks = (req,res) => {
    res.status(200).json({total:books.length,books})
}

export const getAllBorrowedBooks = (req,res) =>{
    const formattedRecords = borrowRecords.map(record => {
        const book = books.find(b => b.id === record.bookId);
        const member = members.find(m => m.id === record.memberId)

        return {
            borrowId:record.id,
            bookTitle: book ? book.title : "unknown book",
            memberName: member ? member.name:"unknown member",
            borrowDate:record.borrowDate,
            returnDate:record.returnDate,
            returnStatus:record.status
        }
    });
    res.status(200).json({
        total:formattedRecords.length,
        records:formattedRecords
    })
}

export const getAllMembers = (req,res) => {
    res.status(200).json({total:members.length,members})
}