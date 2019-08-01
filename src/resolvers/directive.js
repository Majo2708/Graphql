const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver} = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field){
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function(...args){
            const [, , context] = args; //Se tienen que respetar los lugares del root y args para luego enviar el contexto
            if(context.user){
                return await resolve.apply(this, args);
            }
            else{
                throw new Error('Necesitas estar logueado');
            }
        }
    }
}

module.exports = { AuthDirective }