using System.Linq;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;

        }
        // get post push
        [HttpGet]

        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();
            var products = await PagedList<Product>.ToPagedList(query,
            productParams.PageNumber, productParams.PageSize);
            //เพื่อส่งค่ำกำรแบ่งหน้ำไปให้Axios Interceptor น ำไปใช้ต่อ
            Response.AddPaginationHeader(products.MetaData);
            return Ok(products);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            //อ่ำนค่ำที่ซ ้ำกันมำเพียงค่ำเดียว
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
            return Ok(new { brands, types });
        }

        // แบบย่อใช้งานง่าย
        // [HttpGet("[action]")]
        // public async Task<IActionResult> TestGetProducts()
        // {
        //     return Ok(await _context.Products.ToListAsync());
        // }
    }
}