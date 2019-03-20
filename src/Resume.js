import React, { Component } from "react";


class Resume extends Component {

    state = {
            professional_experience: [
                        {
                            title: 'Web Developer',
                            company: 'Unylog',
                            from: 'June 2014',
                            to: 'Present',
                            responsabilities: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, magnam aut animi, excepturi voluptatum placeat dolor accusantium atque iure! Animi architecto eveniet voluptatum illo ut maiores sed, autem pariatur culpa'
                        },
                        {
                            title: 'Tecnico informatica',
                            company: 'Unylog 2',
                            from: 'June 2014',
                            to: 'Present',
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
                return <h2>{professional_experience.title}</h2>
            })}
            </div>
        );
        }
        return (
            <div>
                {professional_experiences}
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, magnam aut animi, excepturi voluptatum placeat dolor accusantium atque iure! Animi architecto eveniet voluptatum illo ut maiores sed, autem pariatur culpa?</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, magnam aut animi, excepturi voluptatum placeat dolor accusantium atque iure! Animi architecto eveniet voluptatum illo ut maiores sed, autem pariatur culpa?</p>
            </div>
        );
    }
}

export default Resume;