
import { jobs, findComp, addRecruiter, recruiterAuthentication, deleteJob, addJobPost, storeApplicant, candidates, editJobPost } from '../modals/user.modal.js';
import { filterSearch } from '../../public/js/script.js';

export let showLogout = false;
export default class userController {

    viewJob = (req, res, next) => {
        // if (filterSearch()) {
        //     const jobs = filterSearch();
        //     res.render('jobs', { jobs: jobs, customCss: 'jobs.css', message: null, });
        // }
        res.render('jobs', { jobs: jobs, customCss: 'jobs.css', message: null, });
    }

    viewJobDetails = (req, res, next) => {
        const compId = req.params.id;
        const comp = findComp(compId);
        // console.log(comp);
        if (!comp) {
            res.status(401).json({ message: 'company is not hiring' });
        }
        else {

            res.render('viewJobDetail', { comp: comp, customCss: 'jobDetails.css', message: null });
        }
    }
    handleApply = (req, res, next) => {
        // const id = req.params.id;
        const formData = req.body;
        const resume = req.file;
        // console.log(resume);
        // console.log(formData);
        const compId = req.params.id;
        storeApplicant(formData, resume, compId);

        const comp = findComp(compId);
        comp.applicants++;
        res.render('viewJobDetail', { comp: comp, customCss: 'jobDetails.css', message: 'Successfully Submitted the response', jobs: jobs });
    }
    register = (req, res, next) => {
        // console.log(req.body);
        if (addRecruiter(req.body)) {
            res.render('home', { customCss: 'home.css', message: 'Registration Successfull Please Login', showLoginModal: true });
        } else {
            res.render('home', { customCss: 'home.css', message: 'Registration is not successful', showLoginModal: false });

        }
    }
    login = (req, res, next) => {
        // console.log(req.body);
        const { name, email } = req.body;

        //  authentication
        const recruiterProfile = recruiterAuthentication(req.body);

        if (recruiterProfile) {
            // Setting up session variables
            req.session.userEmail = recruiterProfile.email;
            req.session.userName = recruiterProfile.name;



            res.render('jobs', {
                jobs: jobs,
                customCss: 'jobs.css',
                message: `Welcome ${recruiterProfile.name}`,

            });


        } else {

            res.redirect('/');
        }
    };

    logout = (req, res, next) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.redirect('/some-error-page');
            }
            res.redirect('/');
        });
    }

    deletePost = (req, res, next) => {

        let jobId = req.params.id;

        const jobs = deleteJob(jobId);
        // const recruiterProfile = recruiterAuthentication(req.body);
        res.render('jobs', { jobs: jobs, customCss: 'jobs.css', message: null, });

    }

    postNewJobForm = (req, res, next) => {

        res.render('postJobs', {});
    }
    postingNewJob = (req, res, next) => {
        // console.log(req.body);
        addJobPost(req.body);
        res.render('jobs', { jobs: jobs, customCss: 'jobs.css', message: null, });
    }

    applicantsDetails = (req, res, next) => {
        const jobId = req.params.id;
        res.render('applicantsDetails', { candidates: candidates, jobId: jobId });
    }
    updateJobPost = (req, res, next) => {
        const compId = req.params.id;
        const comp = findComp(compId);
        res.render('updateJobPost', { comp: comp })
    }

    handleUpdateJobPost = (req, res, next) => {
        // console.log(req.body);
        const id = req.params.id;
        const comp = editJobPost(req.body, id);

        res.render('viewJobDetail', { comp: comp, customCss: 'jobDetails.css', message: 'Successfully Submitted the response', jobs: jobs });
    }
}