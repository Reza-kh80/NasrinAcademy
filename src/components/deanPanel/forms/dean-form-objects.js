import { getDatetime } from '../../../utils/datetime';
// Teacher & Teching Request
export const initialTeachingRequestObject = {
    TeachingLanguage: "",
    TeachingCourses: "",
}
export const initialPrivateStudentObject = {
    StudentId: null,
    Name: "",
    Phone: "",
    Email: "",
    Photo: "",
    Address: "",
    Message: "",
    IsRegistered: true,
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
    PrivateTeacherCourseId: "",
    SignedAgreement: false,
    //
    UserId: "",
    Username: "",
    Password: "",
    RoleId: "2",
}
export const initialPublicStudentObject = {
    StudentId: null,
    Name: "",
    Phone: "",
    Email: "",
    Photo: "",
    Address: "",
    Message: "",
    IsRegistered: true,
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
    PublicTermId: "",
    SignedAgreement: false,
    //
    UserId: "",
    Username: "",
    Password: "",
    RoleId: "2",
}
export const initialPrivateCourseRequestObject = {
    PrivateCourseRequestId: "",
    Name: "",
    Phone: "",
    Email: "",
    Photo: "",
    Address: "",
    Message: "",
    CourseName: "",
    TeacherName: "",
    PrivateTeacherCourseId: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTeacherObject = {
    TeacherId: "",
    Name: "",
    NameFr: "",
    NameFa: "",
    Phone: "",
    Email: "",
    Photo: "",
    Address: "",
    CoursesDescription: "",
    CoursesDescriptionFr: "-",
    CoursesDescriptionFa: "",
    ExperienceYear: "",
    SessionPrice: "",
    SessionPriceFa: "",
    ExperienceDetail: "",
    ExperienceDetailFr: "-",
    ExperienceDetailFa: "",
    Education: "",
    EducationFr: "-",
    EducationFa: "",
    Certificate: "",
    CertificateFr: "-",
    CertificateFa: "",
    IsAvailableSun: false,
    IsAvailableMon: false,
    IsAvailableTue: false,
    IsAvailableWed: false,
    IsAvailableThu: false,
    IsAvailableFri: false,
    IsAvailableSat: false,
    HasArticle: false,
    HasFlashCard: false,
    //
    UserId: "",
    Username: "",
    Password: "",
    RoleId: "3",
    //
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
    LanguageId: "",
    TeachingLevel: "",
    TeachingLevelFr: "-",
    TeachingLevelFa: "",
    TeachingAgeLevel: "",
    TeachingAgeLevelFr: "-",
    TeachingAgeLevelFa: "",
    BankNumber: "",
    SignedAgreement: false,
    IsRegistered: false,
}
// 
export const initialTeacherCourseObject = {
    PrivateTeacherCourseId: "",
    CourseId: "",
    TeacherId: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialPublicTeacherCourseObject = {
    PublicTeacherCourseId: "",
    CourseId: "",
    TeacherId: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermObject = {
    PrivateTermId: "",
    PrivateTeacherCourseId: "",
    StudentId: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialPublicTermObject = {
    PublicTermId: "",
    PublicTeacherCourseId: "",
    Capacity: "",
    AvailableCapacity: "",
    Price: "",
    Duration: "",
    Start: "",
    Finish: "",
    Times: "",
    EnrollmentDeadline: "",
    PriceFa: "",
    DurationFa: "",
    StartFa: "",
    FinishFa: "",
    TimesFa: "",
    EnrollmentDeadlineFa: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
export const initialTermStudentObject = {
    PublicTermStudentId: "",
    PublicTermId: "",
    StudentId: "",
    Modifier: "",
    ModificationDate: getDatetime(),
    IsDeleted: false,
}
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

