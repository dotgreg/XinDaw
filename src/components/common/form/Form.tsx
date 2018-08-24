// import * as React from 'react';
// import {each} from 'lodash'

// interface Props {
//     onSubmit: Function
// }

// interface State {
//     models: {[key:string]:string|number|undefined},
//     errors: {[key:string]:{message:string}}
// }

// export default class Form extends React.Component<Props,State> {

//     constructor(props) {
//         super(props)
//         this.state = {
//         }
//     }

//     componentDidMount() {

//     }

//     initForm: (fields) => {
//         each(fields, (item) => {
//             // this.$set( this.models, item.id, item.value || undefined )
//             // this.$set( this.errors, item.id, {message: undefined} )
//         })
//     }

//     validateAndSubmit: () => {
//         // let isFormValid:boolean = this.validateForm()
//         // if (isFormValid) this.props.onSubmit(this.models)
//     }

//     validateForm: () => {

//         let hasErrors:boolean = false

//         each(this.props.fields, field => {
//             let input = this.models[field.id]
            
//             // check if not empty
//             if (field.required) { 
//                 let error = rules['notEmpty'](input)
//                 this.errors[field.id].message = error
//                 if (error) hasErrors = true
//             }

//             // check value validator
//             if (field.rule) {
//                 if (!rules[field.rule]) console.warn(`Validation rule ${field.rule} does not exit, ignored`)
//                 else { 
//                     let error = rules[field.rule](input)
//                     this.errors[field.id].message = error
//                     if (error) hasErrors = true
//                 }
//             }
//         })
//         return !hasErrors
//     }

//     render() {
//         return (
//            <div></div>
//         )
//     }   
// }
