import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    key: string;
    documents: string[];
    docName: string[];
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    key: string;
    documents: string[];
    docName: string[];
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    key: string;
    documents: string[];
    docName: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    key: string;
    documents: string[];
    docName: string[];
}, mongoose.Document<unknown, {}, {
    key: string;
    documents: string[];
    docName: string[];
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    key: string;
    documents: string[];
    docName: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        key: string;
        documents: string[];
        docName: string[];
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        key: string;
        documents: string[];
        docName: string[];
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    key: string;
    documents: string[];
    docName: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    key: string;
    documents: string[];
    docName: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=userSchema.d.ts.map