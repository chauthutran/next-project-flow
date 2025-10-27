// mock the DB connector module (default export)
jest.mock('@/app/lib/dbService/db', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('@/app/models/Task', () => ({
    __esModule: true,
    default: {
        find: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
        deleteMany: jest.fn()
    }
}));

import {
    DELETE,
    POST,
    GET as PROJECT_ID_GET
} from '@/app/api/projects/[id]/tasks/route';
import { DELETE as TASK_ID_DELETE, PUT } from '@/app/api/tasks/[id]/route';

const dbTaskA = {
    _id: 'task_id_a',
    name: 'Task A',
    projectId: '64f72bf0f1c1b47650cbe8a2',
    description: 'Task Description A',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    teamMembers: ['test1@gmail.com', 'test2@gmail.com'],
    createdBy: '64f72bf0f1c1b47650cbe8a1'
};

const dbTaskB = {
    _id: 'task_id_b',
    name: 'Task B',
    projectId: '64f72bf0f1c1b47650cbe8a2',
    description: 'Task Description B',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    teamMembers: ['test1@gmail.com', 'test2@gmail.com'],
    createdBy: '64f72bf0f1c1b47650cbe8a1'
};

const TaskModel = jest.requireMock('@/app/models/Task').default as {
    find: jest.Mock;
    create: jest.Mock;
    findByIdAndUpdate: jest.Mock;
    findByIdAndDelete: jest.Mock;
    deleteMany: jest.Mock;
};

describe('Task API - Fetch tasks by projectId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns 200 with tasks for valid projectId', async () => {
        (TaskModel.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue([dbTaskA, dbTaskB])
        });

        const req = new Request(
            `http://localhost/api/tasks/${dbTaskA.projectId}/tasks`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // act
        const res = await PROJECT_ID_GET(req, {
            params: { id: dbTaskA.projectId }
        });
        const body = await res.json();
        expect(res.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data.length).toBe(2);
        expect(TaskModel.find).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB create throws', async () => {
        // arrange - simulate DB error
        (TaskModel.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error('DB failure'))
        });

        const req = new Request(
            `http://localhost/api/tasks/${dbTaskA.projectId}/tasks`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // act
        const res = await PROJECT_ID_GET(req, {
            params: { id: dbTaskA.projectId }
        });
        const body = await res.json();
        expect(res.status).toBe(500);
        expect(body.status).toBe('error');
        expect(TaskModel.find).toHaveBeenCalledTimes(1);
    });
});

describe('Tasks API - Create a task', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new task and return success', async () => {
        TaskModel.create.mockResolvedValue({
            ...dbTaskA,
            toJSON() {
                // return the plain object shape your route expects
                return { ...dbTaskA };
            }
        });

        const { _id, ...payload } = dbTaskA;

        const req = new Request(
            `http://localhost/api/projects/${dbTaskA.projectId}/tasks`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }
        );

        // act
        const res = await POST(req, { params: { id: dbTaskA.projectId } });
        const body = await res.json();
        expect(res.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data).toBeDefined();
        expect(body.data._id).toBe(dbTaskA._id);
        expect(TaskModel.create).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB create throws', async () => {
        // arrange - simulate DB error
        TaskModel.create.mockRejectedValue(new Error('DB failure'));

        const { _id, ...payload } = dbTaskA;
        const req = new Request(
            `http://localhost/api/projects/${dbTaskA.projectId}/tasks`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }
        );

        // act
        const res = await POST(req, { params: { id: dbTaskA.projectId } });
        const body = await res.json();

        // assert
        expect(res.status).toBeGreaterThanOrEqual(500);
        expect(body.status).toBe('error');
        expect(body.message).toBe('DB failure');
        expect(TaskModel.create).toHaveBeenCalled();
    });
});

describe('Tasks API - Update a task', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update an existing task and return success', async () => {
        (TaskModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue({
                ...dbTaskA,
                name: 'Task Name Updated'
            })
        });

        const { _id, ...payload } = dbTaskA;
        payload.name = 'Task Name Updated';

        const req = new Request(`http://localhost/api/tasks/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        // act
        const res = await PUT(req, { params: { id: _id } });
        const body = await res!.json();
        expect(res!.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data).toBeDefined();
        expect(body.data._id).toBe(dbTaskA._id);
        expect(body.data.name).toBe('Task Name Updated');
        expect(TaskModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB update throws', async () => {
        // arrange - simulate DB error
        (TaskModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error('DB failure'))
        });

        const { _id, ...payload } = dbTaskA;
        payload.name = 'Task Name Updated';

        const req = new Request(`http://localhost/api/tasks/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        // act
        const res = await PUT(req, { params: { id: _id } });
        const body = await res!.json();
        expect(res!.status).toBe(500);
        expect(body.status).toBe('error');
        expect(TaskModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });
});

describe('Tasks API - Delete a task', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a task and return success', async () => {
        (TaskModel.findByIdAndDelete as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue({
                ...dbTaskA
            })
        });

        const _id = dbTaskA._id;
        const req = new Request(`http://localhost/api/tasks/${_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        // act
        const res = await TASK_ID_DELETE(req, { params: { id: _id } });
        const body = await res!.json();
        expect(res!.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data).toBeDefined();
        expect(body.data._id).toBe(dbTaskA._id);
        expect(TaskModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB update throws', async () => {
        // arrange - simulate DB error
        (TaskModel.findByIdAndDelete as jest.Mock).mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error('DB failure'))
        });

        const { _id, ...payload } = dbTaskA;
        payload.name = 'Task Name Updated';

        const req = new Request(`http://localhost/api/tasks/${_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        // act
        const res = await TASK_ID_DELETE(req, { params: { id: _id } });
        const body = await res!.json();
        expect(res!.status).toBe(500);
        expect(body.status).toBe('error');
        expect(TaskModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
});

describe('Tasks API - Delete tasks by projectId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete tasks by projectId and return success', async () => {
        // if route first fetches docs with find(...).lean()
        (TaskModel.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue([dbTaskA, dbTaskB])
        });

        // and then calls deleteMany(...) — return a delete result
        (TaskModel.deleteMany as jest.Mock).mockResolvedValue({
            deletedCount: 2
        });

        const req = new Request(
            `http://localhost/api/projects/${dbTaskA.projectId}/tasks`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const res = await DELETE(req, { params: { id: dbTaskA.projectId } });
        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data).toBeDefined();
        expect(body.data.length).toBe(2);
        expect(TaskModel.find).toHaveBeenCalledTimes(1);
        expect(TaskModel.deleteMany).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB update throws', async () => {
         // if route first fetches docs with find(...).lean()
        (TaskModel.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue([dbTaskA, dbTaskB])
        });

        // arrange - simulate DB error
        (TaskModel.deleteMany as jest.Mock).mockRejectedValue(new Error('DB failure'));
        
       
        const req = new Request(
            `http://localhost/api/projects/${dbTaskA.projectId}/tasks`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const res = await DELETE(req, { params: { id: dbTaskA.projectId } });
        const body = await res!.json();
        expect(res!.status).toBe(500);
        expect(body.status).toBe('error');
        expect(TaskModel.deleteMany).toHaveBeenCalledTimes(1);
    });
});
