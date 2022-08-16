import { getDatetime } from '../../../utils/datetime';
// Article
export const initialArticleObject = {
    ArticleId: "",
    Title: "",
    TitleFr: "",
    TitleFa: "",
    Level: "",
    LevelFr: "",
    LevelFa: "",
    Body1: "",
    Body1Fr: "",
    Body1Fa: "",
    Body2: "",
    Body2Fr: "",
    Body2Fa: "",

    Description: "Not applied",
    DescriptionFr: "Not applied",
    DescriptionFa: "Not applied",
    FileName: "",
    IsFree: false,


    MenuId: 1,
    TeacherId: "",
    LevelId: "",

    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialFlashCardObject = {
    FlashCardId: "",
    Title: "",
    TitleTranslation: "",
    Description: "",
    DescriptionTranslation: "",
    Example: "",
    ExampleTranslation: "",
    Picture: "",
    Audio: "",
    Color: "",
    IsFree: false,
    TeacherId: "",
    LevelId: "",
    FlashCardCategoryId: "",

    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialAssignmentObject = {
    AssignmentId: "",
    Title: "",
    Request: "",
    FileName: "",
    TeacherId: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialMaterialObject = {
    MaterialId: "",
    Title: "",
    FileName: "",
    TeacherId: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermArticleObject = {
    StudentId: "",
    LevelId: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermFlashCardObject = {
    Student: "",
    LevelId: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermAssignmentObject = {
    StudentId: "",
    AssignmentId: "",
    Answer: "",
    Solution: "",
    Note: "",
    Grade: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermMaterialObject = {
    StudentId: "",
    MaterialId: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermNoticeObject = {
    TermNoticeId: "",
    StudentId: "",
    Title: "",
    Description: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermProgressObject = {
    TermProgressId: "",
    StudentId: "",
    Label: "",
    Plan: "",
    Actual: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermResultObject = {
    TermResultId: "",
    StudentId: "",
    Code: "",
    Title: "",
    Duration: "",
    SessionNumber: "",
    ResultDate: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermStatusObject = {
    TermStatuseId: "",
    StudentId: "",
    Sessions: "",
    RemainSessions: "",
    NextPayment: "",
    NextPaymentDate: "",
    TotalPayment: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermPaymentObject = {
    TermPaymentId: "",
    Amount: 0,
    IssueDate: getDatetime(),
    DueDate: "",
    IsPaid: false,
    PaidDate: "",
    ReferenceId: 0,
    Status: 0,
    Authority: "",
    Modifier: "",
    IsDeleted: false,
    StudentId: "",
}
export const initialTermPaymentUpdate = {
    TermPaymentId: 0,
    ReferenceId: 0,
    Status: "",
    CardPan: ""
}
