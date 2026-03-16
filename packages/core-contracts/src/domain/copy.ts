     export interface Copy {
       id: string;
       title: string;
       content: string;
       status: 'draft' | 'published' | 'archived';
       authorId: string;
       createdAt: Date;
       updatedAt: Date;
    }
   
    export type CreateCopyDTO = Pick<Copy, 'title' | 'content' | 'authorId'>;