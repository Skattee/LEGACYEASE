const Will = require('../models/willModel');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun } = require('docx');
const fs = require('fs');
const path = require('path');

// Fetch details of a specific will
exports.getWillDetails = async (req, res) => {
    try {
        const willId = req.params.willId;
        const will = await Will.findById(willId);
        if (!will) {
            return res.status(404).json({ message: 'Will not found' });
        }
        res.status(200).json(will);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Download a will in Word format
exports.downloadWill = async (req, res) => {
    try {
        const willId = req.params.willId;
        const will = await Will.findById(willId);
        if (!will) {
            return res.status(404).json({ message: 'Will not found' });
        }

        // Read logo image as buffer
        const logoPath = path.join(__dirname, '../assets/logo.png');
        let logoBuffer = null;
        try {
            logoBuffer = fs.readFileSync(logoPath);
        } catch (e) {
            logoBuffer = null;
        }

        // Prepare children info
        const childrenInfo = will.childrenInfo || "N/A";
        const moreChildren = will.moreChildren || "N/A";
        const realEstateInfo = will.realEstateInfo || "N/A";

        // Create the document
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        ...(logoBuffer ? [
                            new Paragraph({
                                children: [
                                    new ImageRun({
                                        data: logoBuffer,
                                        transformation: { width: 120, height: 60 },
                                    }),
                                ],
                                alignment: "center",
                            }),
                            new Paragraph({ text: "", spacing: { after: 200 } }),
                        ] : []),
                        new Paragraph({
                            text: "Last Will and Testament",
                            heading: HeadingLevel.TITLE,
                            alignment: "center",
                            spacing: { after: 300 },
                        }),
                        // Personal Info Section
                        new Paragraph({
                            text: "Personal Information",
                            heading: HeadingLevel.HEADING_1,
                            spacing: { after: 200 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Full Name: `, bold: true }),
                                new TextRun(will.fullName || "N/A"),
                            ],
                            spacing: { after: 100 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Also Known As: `, bold: true }),
                                new TextRun(will.alsoKnownAs || "N/A"),
                            ],
                            spacing: { after: 100 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Omang Number: `, bold: true }),
                                new TextRun(will.omangNumber || "N/A"),
                            ],
                            spacing: { after: 100 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Address: `, bold: true }),
                                new TextRun(will.address || "N/A"),
                            ],
                            spacing: { after: 100 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Phone Number: `, bold: true }),
                                new TextRun(will.phoneNumber || "N/A"),
                            ],
                            spacing: { after: 100 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Date of Birth: `, bold: true }),
                                new TextRun(will.dateOfBirth ? will.dateOfBirth.toString().slice(0, 10) : "N/A"),
                            ],
                            spacing: { after: 100 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Marital Status: `, bold: true }),
                                new TextRun(will.maritalStatus || "N/A"),
                            ],
                            spacing: { after: 100 },
                        }),
                        new Paragraph({ text: "" }), // blank line for spacing
                        // Spouse Info Section (if married)
                        ...(will.maritalStatus === 'Married'
                            ? [
                                new Paragraph({
                                    text: "Spouse Information",
                                    heading: HeadingLevel.HEADING_1,
                                    spacing: { after: 200 },
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: `Spouse Name: `, bold: true }),
                                        new TextRun(will.spouseName || "N/A"),
                                    ],
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: `Spouse Address: `, bold: true }),
                                        new TextRun(will.spouseAddress || "N/A"),
                                    ],
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: `Spouse Date of Birth: `, bold: true }),
                                        new TextRun(will.spouseDateOfBirth ? will.spouseDateOfBirth.toString().slice(0, 10) : "N/A"),
                                    ],
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({ text: `Spouse Omang Number: `, bold: true }),
                                        new TextRun(will.spouseOmangNumber || "N/A"),
                                    ],
                                }),
                                new Paragraph({ text: "" }),
                            ]
                            : []
                        ),
                        // Children Info Section
                        new Paragraph({
                            text: "Children Information",
                            heading: HeadingLevel.HEADING_1,
                            spacing: { after: 200 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Details: `, bold: true }),
                                new TextRun(childrenInfo),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Anticipate More Children: `, bold: true }),
                                new TextRun(moreChildren),
                            ],
                            spacing: { after: 100 },
                        }),
                        new Paragraph({ text: "" }),
                        // Real Estate Section
                        new Paragraph({
                            text: "Real Estate Information",
                            heading: HeadingLevel.HEADING_1,
                            spacing: { after: 200 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: realEstateInfo }),
                            ],
                            spacing: { after: 100 },
                        }),
                        new Paragraph({ text: "" }),
                        // Executor Section
                        new Paragraph({
                            text: "Executor Information",
                            heading: HeadingLevel.HEADING_1,
                            spacing: { after: 200 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Name: `, bold: true }),
                                new TextRun(will.executorName || "N/A"),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Address: `, bold: true }),
                                new TextRun(will.executorAddress || "N/A"),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Relationship: `, bold: true }),
                                new TextRun(will.executorRelationship || "N/A"),
                            ],
                            spacing: { after: 100 },
                        }),
                        new Paragraph({ text: "" }),
                        // Will Content Section
                        new Paragraph({
                            text: "Will Title & Content",
                            heading: HeadingLevel.HEADING_1,
                            spacing: { after: 200 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Title: `, bold: true }),
                                new TextRun(will.title || "N/A"),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Content: `, bold: true }),
                                new TextRun(will.content || "N/A"),
                            ],
                            spacing: { after: 200 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({ text: `Created At: `, bold: true }),
                                new TextRun(will.createdAt ? will.createdAt.toDateString() : "N/A"),
                            ],
                            spacing: { after: 200 },
                        }),
                        new Paragraph({
                            text: "© LegacyEase",
                            alignment: "center",
                            spacing: { before: 400 },
                        }),
                    ],
                },
            ],
        });

        const buffer = await Packer.toBuffer(doc);
        res.setHeader('Content-Disposition', 'attachment; filename=will.docx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};