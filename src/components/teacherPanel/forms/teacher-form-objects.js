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
    TermId: "",
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
    PrivateTermNoticeId: "",
    StudentId: "",
    Title: "",
    Description: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialPublicTermNoticeObject = {
    PrivateTermNoticeId: "",
    StudentId: "",
    Title: "",
    Description: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermProgressObject = {
    PrivateTermProgressId: "",
    StudentId: "",
    Label: "",
    Plan: "",
    Actual: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialPublicTermProgressObject = {
    PublicTermProgressId: "",
    StudentId: "",
    Label: "",
    Plan: "",
    Actual: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermResultObject = {
    PrivateTermResultId: "",
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
export const initialPublicTermResultObject = {
    PublicTermResultId: "",
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
    PrivateTermStatusId: "",
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
export const initialPublicTermStatusObject = {
    PublicTermStatusId: "",
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
    PrivateTermPaymentId: "",
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
export const initialPublicTermPaymentObject = {
    PublicTermPaymentId: "",
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
