/**
 * @openapi
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: John Doe Corp
 *         logo:
 *           type: string
 *           example: path/to/your/logo
 *         tier:
 *           type: string
 *           enum: [basic, pro, corporate]
 *           example: pro
 *         tenant name:
 *           type: string
 *           example: john_tenant
 *         additional:
 *           type: object
 *           properties:
 *             example:
 *               type: json
 *               info: "info about the company"
 *         theme:
 *           type: string
 *           enum: [red, blue, green, yellow, purple, orange]
 *           default: red
 *           example: blue 
 */
