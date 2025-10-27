// mock the DB connector module (default export)
jest.mock('@/app/lib/dbService/db', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('@/app/models/Meeting', () => ({
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
} from '@/app/api/projects/[id]/meetings/route';
import { DELETE as TASK_ID_DELETE, PUT } from '@/app/api/meetings/[id]/route';

const dbMeetingA = {
    _id: 'meeting_id_a',
    name: 'Meeting A',
    projectId: '64f72bf0f1c1b47650cbe8a2',
    description: 'Meeting Description A',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    teamMembers: ['test1@gmail.com', 'test2@gmail.com'],
    createdBy: '64f72bf0f1c1b47650cbe8a1'
};

const dbMeetingB = {
    _id: 'meeting_id_b',
    name: 'Meeting B',
    projectId: '64f72bf0f1c1b47650cbe8a2',
    description: 'Meeting Description B',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    teamMembers: ['test1@gmail.com', 'test2@gmail.com'],
    createdBy: '64f72bf0f1c1b47650cbe8a1'
};

const MeetingModel = jest.requireMock('@/app/models/Meeting').default as {
    find: jest.Mock;
    create: jest.Mock;
    findByIdAndUpdate: jest.Mock;
    findByIdAndDelete: jest.Mock;
    deleteMany: jest.Mock;
};

describe('Meeting API - Fetch meetings by projectId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns 200 with meetings for valid projectId', async () => {
        (MeetingModel.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue([dbMeetingA, dbMeetingB])
        });

        const req = new Request(
            `http://localhost/api/meetings/${dbMeetingA.projectId}/meetings`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // act
        const res = await PROJECT_ID_GET(req, {
            params: { id: dbMeetingA.projectId }
        });
        const body = await res.json();
        expect(res.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data.length).toBe(2);
        expect(MeetingModel.find).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB create throws', async () => {
        // arrange - simulate DB error
        (MeetingModel.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error('DB failure'))
        });

        const req = new Request(
            `http://localhost/api/meetings/${dbMeetingA.projectId}/meetings`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // act
        const res = await PROJECT_ID_GET(req, {
            params: { id: dbMeetingA.projectId }
        });
        const body = await res.json();
        expect(res.status).toBe(500);
        expect(body.status).toBe('error');
        expect(MeetingModel.find).toHaveBeenCalledTimes(1);
    });
});

describe('Meetings API - Create a meeting', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new meeting and return success', async () => {
        MeetingModel.create.mockResolvedValue({
            ...dbMeetingA,
            toJSON() {
                // return the plain object shape your route expects
                return { ...dbMeetingA };
            }
        });

        const { _id, ...payload } = dbMeetingA;

        const req = new Request(
            `http://localhost/api/projects/${dbMeetingA.projectId}/meetings`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }
        );

        // act
        const res = await POST(req, { params: { id: dbMeetingA.projectId } });
        const body = await res.json();
        expect(res.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data).toBeDefined();
        expect(body.data._id).toBe(dbMeetingA._id);
        expect(MeetingModel.create).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB create throws', async () => {
        // arrange - simulate DB error
        MeetingModel.create.mockRejectedValue(new Error('DB failure'));

        const { _id, ...payload } = dbMeetingA;
        const req = new Request(
            `http://localhost/api/projects/${dbMeetingA.projectId}/meetings`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }
        );

        // act
        const res = await POST(req, { params: { id: dbMeetingA.projectId } });
        const body = await res.json();

        // assert
        expect(res.status).toBeGreaterThanOrEqual(500);
        expect(body.status).toBe('error');
        expect(body.message).toBe('DB failure');
        expect(MeetingModel.create).toHaveBeenCalled();
    });
});

describe('Meetings API - Update a meeting', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update an existing meeting and return success', async () => {
        (MeetingModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue({
                ...dbMeetingA,
                name: 'Meeting Name Updated'
            })
        });

        const { _id, ...payload } = dbMeetingA;
        payload.name = 'Meeting Name Updated';

        const req = new Request(`http://localhost/api/meetings/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        // act
        const res = await PUT(req, { params: { id: _id } });
        const body = await res.json();
        expect(res!.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data).toBeDefined();
        expect(body.data._id).toBe(dbMeetingA._id);
        expect(body.data.name).toBe('Meeting Name Updated');
        expect(MeetingModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB update throws', async () => {
        // arrange - simulate DB error
        (MeetingModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error('DB failure'))
        });

        const { _id, ...payload } = dbMeetingA;
        payload.name = 'Meeting Name Updated';

        const req = new Request(`http://localhost/api/meetings/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        // act
        const res = await PUT(req, { params: { id: _id } });
        const body = await res!.json();
        expect(res!.status).toBe(500);
        expect(body.status).toBe('error');
        expect(MeetingModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });
});

describe('Meetings API - Delete a meeting', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a meeting and return success', async () => {
        (MeetingModel.findByIdAndDelete as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue({
                ...dbMeetingA
            })
        });

        const _id = dbMeetingA._id;
        const req = new Request(`http://localhost/api/meetings/${_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        // act
        const res = await TASK_ID_DELETE(req, { params: { id: _id } });
        const body = await res!.json();
        expect(res!.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data).toBeDefined();
        expect(body.data._id).toBe(dbMeetingA._id);
        expect(MeetingModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB update throws', async () => {
        // arrange - simulate DB error
        (MeetingModel.findByIdAndDelete as jest.Mock).mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error('DB failure'))
        });

        const { _id, ...payload } = dbMeetingA;
        payload.name = 'Meeting Name Updated';

        const req = new Request(`http://localhost/api/meetings/${_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        // act
        const res = await TASK_ID_DELETE(req, { params: { id: _id } });
        const body = await res!.json();
        expect(res!.status).toBe(500);
        expect(body.status).toBe('error');
        expect(MeetingModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
});

describe('Meetings API - Delete meetings by projectId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete meetings by projectId and return success', async () => {
        // if route first fetches docs with find(...).lean()
        (MeetingModel.find as jest.Mock).mockReturnValue({
            lean: jest
                .fn()
                .mockResolvedValue([{ ...dbMeetingA }, { ...dbMeetingB }])
        });

        // and then calls deleteMany(...) — return a delete result
        (MeetingModel.deleteMany as jest.Mock).mockResolvedValue({
            deletedCount: 2
        });

        const req = new Request(
            `http://localhost/api/projects/${dbMeetingA.projectId}/meetings`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const res = await DELETE(req, { params: { id: dbMeetingA.projectId } });
        const body = await res.json();
        console.log('====== fasdfasd  BODY', body);
        expect(res.status).toBe(200);
        expect(body.status).toBe('success');
        expect(body.data).toBeDefined();
        expect(body.data.length).toBe(2);
        expect(MeetingModel.find).toHaveBeenCalledTimes(1);
        expect(MeetingModel.deleteMany).toHaveBeenCalledTimes(1);
    });

    it('returns 500 when DB update throws', async () => {
        // if route first fetches docs with find(...).lean()
        (MeetingModel.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue([dbMeetingA, dbMeetingB])
        });

        // arrange - simulate DB error
        (MeetingModel.deleteMany as jest.Mock).mockRejectedValue(
            new Error('DB failure')
        );

        const req = new Request(
            `http://localhost/api/projects/${dbMeetingA.projectId}/meetings`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const res = await DELETE(req, { params: { id: dbMeetingA.projectId } });
        const body = await res!.json();
        expect(res!.status).toBe(500);
        expect(body.status).toBe('error');
        expect(MeetingModel.deleteMany).toHaveBeenCalledTimes(1);
    });
});
