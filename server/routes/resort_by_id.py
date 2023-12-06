from flask_restful import Resource
from models.resorts import Resort

class ResortByID(Resource):
    def get(self, id):
        if resort := Resort.query.get(id):
            return resort.serialize()
        return {'message': 'Resort not found'}, 404