import React, { Component } from "react";
import { ResumeCard } from './UtilComponents/Cards';


class Resume extends Component {

    state = {
            professional_experience: [
                        {
                            title: 'Web Developer',
                            company: 'Unylog',
                            website: 'unylog.com',
                            from: 'June 2014',
                            to: 'Present',
                            responsabilities: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, magnam aut animi, excepturi voluptatum placeat dolor accusantium atque iure! Animi architecto eveniet voluptatum illo ut maiores sed, autem pariatur culpa'
                        },
                        {
                            title: 'Systems Analyst',
                            company: 'Trust Found F.F.D.S.A.L.',
                            website: 'ffdsal.com',
                            from: 'June 2014',
                            to: 'Present',
                            responsabilities: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, magnam aut animi, excepturi voluptatum placeat dolor accusantium atque iure! Animi architecto eveniet voluptatum illo ut maiores sed, autem pariatur culpa'
                         },
                         {
                            title: 'Web Developer',
                            company: 'Timba Software',
                            website: 'timbasoftware.com',
                            from: 'January 2012',
                            to: 'November 2012',
                            responsabilities: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, magnam aut animi, excepturi voluptatum placeat dolor accusantium atque iure! Animi architecto eveniet voluptatum illo ut maiores sed, autem pariatur culpa'
                         },
                         {
                            title: 'Web Developer',
                            company: 'Monte Paz S.A.',
                            website: 'montepaz.com.uy',
                            from: 'January 2009',
                            to: 'November 2010',
                            responsabilities: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, magnam aut animi, excepturi voluptatum placeat dolor accusantium atque iure! Animi architecto eveniet voluptatum illo ut maiores sed, autem pariatur culpa'
                         }
            ],
            show_professional_experience: true
    }



    render() {
        let professional_experiences = null;

        if ( this.state.show_professional_experience ) {
        professional_experiences = (
            <div>
            {this.state.professional_experience.map((professional_experience, index) => {
                return (
                    <div>
                    <ResumeCard 
                            title= { professional_experience.title } 
                            company= { professional_experience.company }
                            responsabilities= { professional_experience.responsabilities }                            
                            />
                    </div>        
                        )
            })}
            </div>
        );
        }
        return (
            <div>
                {professional_experiences}
            </div>
        );
    }
}

export default Resume;